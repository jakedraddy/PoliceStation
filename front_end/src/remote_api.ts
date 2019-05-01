
import * as station from "../../common/src/station";
import axios, {AxiosPromise} from "axios";

// axios.interceptors.response.use(function (response) {
//     // Do something with response data

//     for (const val of response.data) {
//     }
//     return response;
//   }, function (error) {
//     // Do something with response error
//     return error;
//   });

export function get_person(PersonId: number): AxiosPromise<station.Person> {
    return axios({
        method: "get",
        url: "/api/person/get/",
        params: {
            PersonId: PersonId
        },
        
    });
}

export function create_person(person: station.Person): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/person/create",
        data: person,
    });
}