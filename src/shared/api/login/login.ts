import { apiInstance } from "../instance/instance"

const loginApi = {

  loginWithTelegram () {
    apiInstance.post('/telegramLogin')
  }

}