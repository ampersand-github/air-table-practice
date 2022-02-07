import Airtable from 'airtable'
require('dotenv').config()

export const airTableInit = (): Airtable.Base => {
  const key:string|undefined = process.env.AIRTABLE_API_KEY
  const base:string |undefined = process.env.AIRTABLE_BASE_ID

  if (!key) {
    console.log(key)
    throw new Error('AIRTABLE_API_KEYが見つかりません')
  }

  if (!base) {
    throw new Error('AIRTABLE_BASE_IDが見つかりません')
  }

  return new Airtable({ apiKey: key }).base(base)
}
