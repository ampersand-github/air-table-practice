import Airtable, { FieldSet, Table } from 'airtable'
import Record from 'airtable/lib/record'

export interface IUser {
  id:string,
  name:string,
  age:number
}

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findOne(id: string): Promise<IUser>;
  register(user:IUser): Promise<void>;
  update(user:IUser): Promise<void>;
  delete(id: string): Promise<void>;
}

const userConverter = (props:Record<FieldSet>):IUser => {
  const { fields } = props

  if (!fields) {
    throw new Error('ユーザーが見つかりません')
  }
  if (typeof fields.id !== 'string') {
    throw new Error('id は string ではありません')
  }
  if (typeof fields.name !== 'string') {
    throw new Error('name は string ではありません')
  }

  if (typeof fields.age !== 'number') {
    throw new Error('age は number ではありません')
  }

  return {
    id: fields.id,
    name: fields.name,
    age: fields.age
  }
}

export class UserRepository implements IUserRepository {
  private readonly user:Table<FieldSet>;

  public constructor (airtable:Airtable.Base) {
    // todo ここでテーブル名を設定して良いのか？
    this.user = airtable('user')
  }

  public async delete (id: string): Promise<void> {
    return Promise.resolve(undefined)
  }

  public async findAll (): Promise<IUser[]> {
    const result = await this.user.select().firstPage() // 100件までしかとってこれない
    return result.map((one) => userConverter(one))
  }

  public async findOne (id: string): Promise<IUser> {
    const result :Record<FieldSet> = await this.user.find(id)
    return userConverter(result)
  }

  public async register (user: IUser): Promise<void> {
    const _ = {
      name: user.name,
      age: user.age
    }
    await this.user.create(_).catch((e) => { throw new Error(e) })
  }

  public async update (user: IUser): Promise<void> {
    const _ = {
      name: user.name,
      age: user.age
    }
    await this.user.update(user.id, _).catch((e) => { throw new Error(e) })
  }
}
