import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

/*Muestra los datos de retiros*/
export const statesShow = (store) => {
    return axios
    .post(url + '/statusShow')
    .then((response) => {
        return response.data.showStatusInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};
 
export const statesCreate = (data) => {
    return axios
    .post(url + '/statusCreate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const statesUpdate = (data) => {
    return axios
    .post(url + '/statusUpdate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const statesDelete = (data) => {
    console.log(data);
    return axios
    .post(url + '/statusDelete',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const CollaboratorShow = (store) => {
    return axios
    .post(url + '/collaboratorShow')
    .then((response) => {
        console.log(response.data.showCollaboratorInfo);
        return response.data.showCollaboratorInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const userShow = (store) => {
    return axios
    .post(url + '/userShow')
    .then((response) => {
        console.log(response.data.showUserInfo);
        return response.data.showUserInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const userCreate = (store) => {
    return axios
    .post(url + '/userCreate')
    .then((response) => {
        console.log(response.data.showUserInfo);
        return response.data.showUserInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const userUpdate = (store) => {
    return axios
    .post(url + '/userUpdate')
    .then((response) => {
        console.log(response.data.showUserInfo);
        return response.data.showUserInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

