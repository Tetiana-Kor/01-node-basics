import path from "path";
import * as fs from "fs/promises";
import shortid from "shortid";
import { handleError } from "./lib/handleError.js";

const contactsPath = path.resolve("db/contacts.json");
// console.log(contactsPath);

// TODO: задокументувати кожну функцію
export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    handleError(error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const filteredContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    console.table(filteredContact);
    return filteredContact;
  } catch (error) {
    handleError(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const removedContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    console.table(removedContact);

    await fs.writeFile(contactsPath, JSON.stringify(removedContact, null, 2));
    return;
  } catch (error) {
    handleError(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const item = { id: shortid(), name, email, phone };
    const addContact = [...contacts, item];
    console.table(addContact);

    await fs.writeFile(contactsPath, JSON.stringify(addContact, null, 2));
    return;
  } catch (error) {
    handleError(error);
  }
}

// console.log(listContacts());
// console.log(getContactById(4));
// console.log(removeContact(5));
// console.log(addContact("Adam", "dfgde@gmail.org", "(704) 500-7993"));
