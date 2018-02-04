const server_uri = "http://localhost:3000"

export default {
  alerts: server_uri + "/alerts",
  defibrillators: server_uri + "/defibrillators",
  drugStores: server_uri + "/drug_stores",
  hospitals: server_uri + "/hospitals",
  wsResponder: "ws://localhost:3000",
}
