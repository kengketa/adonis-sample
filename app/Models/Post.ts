import { DateTime } from 'luxon'
import { BaseModel, column,belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({  })
  public user_id: number

  @column({  })
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}
