const server_uri = "http://192.168.108.98:3000"

export default {
  alerts: server_uri + "/alerts",
  defibrillators: server_uri + "/defibrillators",
  helps: server_uri + "/helps",
  drugStores: server_uri + "/drug_stores",
  hospitals: server_uri + "/hospitals",
  users: server_uri + "/users",
  wsResponder: "ws://192.168.108.98:3000",
}
