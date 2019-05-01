
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

export function create_person(person: station.Person): AxiosPromise<station.Person> {
    return axios({
        method: "post",
        url: "/api/person/create",
        data: person,
    });
}

export function create_case(Case: station.Case): AxiosPromise<station.Case> {
    return axios({
        method: "post",
        url: "/api/case/create",
        data: Case,
    });
}

export function create_evidence(Evidence: station.Evidence): AxiosPromise<station.Evidence> {
    return axios({
        method: "post",
        url: "/api/evidence/create",
        data: Evidence,
    });
}