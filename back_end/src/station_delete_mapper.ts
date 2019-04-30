import * as station from '../../common/src/station'

import * as db from './db'

export async function delete_phoneNumber(phoneNumber: station.PhoneNumber) {
    await db.execute_query(`DELETE FROM PhoneNumber WHERE EID=:EId`, [phoneNumber.PId]);
}

export async function delete_address(address: station.Address) {
    await db.execute_query(`DELETE FROM Address`, [address.AId]);
}

export async function delete_email(email: station.Email) {
    await db.execute_query(`DELETE FROM Email WHERE EId=:EId`, [email.EId]);
}

