import React, { useEffect, useState } from 'react';
import Layaout from '../../../parcials/Layaout';
import CardHeader from '../../../../components/CardHeader'
import { CollaboratorShow, collaboratorCreate, collaboratorUpdate } from '../../../../functions/settingsFunction'
import Loading from '../img/loading.gif'

import {
    MDBBtn,
    MDBIcon,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBInput
} from 'mdbreact';
import TableCollaborators from './Table';
import Swal from 'sweetalert2';
import Select from 'react-select';
import Pagination from '../../../../components/pagination';
import { getStoreActives } from '../../../../functions/ticketFunction';

const CollaboratosList = () => {
    const [dataCollaborator, setDataCollaborator] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(80);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);

    const [stores, setStores] = useState(false);
    const [setItem] = useState(false);
    const [name, setName] = useState(false);
    const [store, setStore] = useState(false);
    const [status, setStatus] = useState(false);
    const [id, setId] = useState(false);
    const state = [
        {
            label: "Activo",
            name: "Activo"
        },
        {
            label: "Inactivo",
            name: "Inactivo"
        }
    ];

    const toggleModal = (id, name, store, status) => {
        setId(id);
        setName(name);
        setStore({ value: store, label: store });
        setStatus({ value: status, label: status });
        setModal(!modal);
    };

    const toggleModalCreate = () => {
        setModalCreate(!modalCreate);
    };

    const createCollaborator = () => {

        if (name === false) {
            return Swal.fire('Error', 'Falto ingresar nombre', 'error');
        }

        if (store === false) {
            return Swal.fire('Error', 'Falto ingresar la tienda', 'error');
        }

        if (status === false) {
            return Swal.fire('Error', 'Falto ingresar estatus', 'error');
        }

        const createItem = {
            name: name,
            store: store,
            status: status
        };


        collaboratorCreate(createItem).then(res => {
            Swal.fire('Éxito', 'Colaborador Ingresada', 'success');
            ReloadData();
            toggleModalCreate();
        }).catch(err => {
            Swal.fire('Error', 'Error al ingresar colaborador', 'error');
        })
    };

    const updateCollaborator = () => {
        const createItem = {
            id: id,
            name: name,
            store: store.value,
            status: status.value
        };
        console.log("UPDATE", createItem)
        collaboratorUpdate(createItem).then(res => {
            Swal.fire('Éxito', 'Colaborador Actualizada', 'success');
            ReloadData();
            toggleModal();
        }).catch(err => {
            Swal.fire('Error', 'Error al actualizar al colaborador', 'error');
        })
    };

    const ReloadData = () => {
        getStores();
        CollaboratorShow()
            .then((res) =>
                setDataCollaborator(res),
                setLoading(false)
            )
            .catch(err =>
                setLoading(true)
            )
    };

    useEffect(() => {
        ReloadData();
    }, [])


    const getStores = () => {
        getStoreActives()
            .then((response) => {
                let data = []
                response.map(sub => {
                    return data.push({ value: sub.name, label: sub.name })
                })
                setStores(data);
            }
            )
            .catch(err =>{
                console.log(err)
                setLoading(false)
            })
    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataCollaborator.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <Layaout>
            { loading ?
                (<center> <img
                    alt='Preload'
                    className='img-fluid'
                    src={Loading}
                /></center>)
                :
                <>
                    <br></br>
                    <CardHeader title="Colaboradores" icon="ticket-alt">
                        <MDBBtn color='info' onClick={() => toggleModalCreate()}>
                            +
                    </MDBBtn>
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Tienda</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Acción</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <TableCollaborators posts={currentPosts} loading={loading} toggleModal={toggleModal} />
                            </MDBTableBody>
                            {dataCollaborator.length < 1 ? (<tr><td colSpan="4"><center>No existen datos de venta</center></td></tr>) : ""}
                        </MDBTable>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={dataCollaborator.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </CardHeader>
                </>}
            {/*-----Nuevo---------*/}
            <MDBModal
                isOpen={modalCreate}
                toggle={() => toggleModalCreate()}
                className='cascading-modal'
            >
                <div className='modal-header primary-color white-text'>
                    <h4 className='title'>
                        <MDBIcon icon='pencil-alt' /> Crear Colaborador
              </h4>
                    <button type='button' className='close' onClick={() => toggleModalCreate()}>
                        <span aria-hidden='true'>×</span>
                    </button>
                </div>
                <MDBModalBody>
                    <MDBInput
                        label='Nombre'
                        icon='user'
                        type='text'
                        error='wrong'
                        success='right'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Select
                        onChange={e => setStore(e.label)}
                        defaultValue={{ value: false, label: 'Selecciona una tienda' }}
                        options={stores}
                    /><br />
                    <Select
                        onChange={e => setStatus(e.label)}
                        defaultValue={{ value: false, label: 'Selecciona el estado' }}
                        options={state}
                    />
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='primary' onClick={() => createCollaborator()}>Crear</MDBBtn>
                    <MDBBtn color='secondary' onClick={() => toggleModalCreate()}>Cerrar</MDBBtn>

                </MDBModalFooter>
            </MDBModal>
            {/*-----Editar---------*/}
            <MDBModal
                isOpen={modal}
                toggle={() => toggleModal()}
                className='cascading-modal'
            >
                <div className='modal-header primary-color white-text'>
                    <h4 className='title'>
                        <MDBIcon icon='pencil-alt' /> Editar Colaborador
              </h4>
                    <button type='button' className='close' onClick={() => toggleModal()}>
                        <span aria-hidden='true'>×</span>
                    </button>
                </div>
                <MDBModalBody>
                    <MDBInput
                        label='Nombre'
                        icon='user'
                        type='text'
                        error='wrong'
                        success='right'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <Select
                        onChange={e => setStore({ value: e.label })}
                        defaultValue={store}
                        options={stores}
                    /><br />
                    <Select
                        onChange={e => setStatus({ value: e.label })}
                        defaultValue={status}
                        options={state}
                    />
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='primary' onClick={() => updateCollaborator()}>Actualizar</MDBBtn>
                    <MDBBtn color='secondary' onClick={() => toggleModal()}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </Layaout>
    )

}
export default CollaboratosList;