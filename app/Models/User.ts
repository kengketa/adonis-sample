import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'
import Redis from "@ioc:Adonis/Addons/Redis";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post, {
    foreignKey: 'user_id',
  })
  public posts: HasMany<typeof Post>

  @beforeSave()
  public static async hashPassword (user: User):Promise<void> {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @beforeSave()
  public static async clearCache():Promise<void>{
    const keys = await Redis.keys('users-*');
    if (keys.length === 0){
      return;
    }
    for (const key of keys) {
      await Redis.del(key);
    }
  }
}
