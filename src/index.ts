import { airTableInit } from './infrastructure/air-table/air-table-init'
import { IUser, IUserRepository, UserRepository } from './infrastructure/air-table/user-reposiotry'
import { v4 as uuid } from 'uuid'

const main = async () => {
  console.log('***** START MAIN *****')

  // * * * * * airtable初期設定 * * * * *
  const airtable = airTableInit()

  // * * * * * リポジトリの設定 * * * * *
  const userRepo:IUserRepository = new UserRepository(airtable)

  // * * * * * 1件取得 * * * * *
  const one:IUser = await userRepo.findOne('recULMtFewp6Mi06b')
  console.log(one)

  // * * * * * 全件取得 * * * * *
  const all :IUser[] = await userRepo.findAll()
  console.log(all)

  // * * * * * 新規作成 * * * * *
  // バリデーションはやらない、ドメイン層作ってないので
  const createData:IUser = {
    id: '', // airtableの場合、idは自動生成なのでこちらから指定できない
    name: '山田三郎',
    age: 24
  }
  await userRepo.register(createData)

  // * * * * * 更新 * * * * *
  // バリデーションはやらない、ドメイン層作ってないので
  const updateData:IUser = {
    id: 'recULMtFewp6Mi06b',
    name: 'updated',
    age: 99
  }
  await userRepo.update(updateData)

  console.log('***** END   MAIN *****')
}

main().then()
