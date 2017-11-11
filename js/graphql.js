import settings from "./settings";

import Lokka from "lokka";
import { Transport } from "lokka-transport-http";


const headers = { "Authorization" : `Token ${localStorage.token}` };

const graphql = new Lokka({
    transport : new Transport(`${settings.serverURL}/graphql/`, { headers }),
});

export default graphql;