
import * as station from "../../common/src/station";
import * as axios from "axios";

export function get_person(PersonId: number): axios.AxiosPromise<any> {
    return axios.default({
        method: "get",
        url: "/api/person/get/",
        params: {
            PersonId: PersonId
        },
    });
}

export function create_person(person: station.Person): axios.AxiosPromise<any> {
    return axios.default({
        method: "post",
        url: "/api/person/create",
        data: person,
    });
}