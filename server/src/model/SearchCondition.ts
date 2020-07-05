import BaseEntity from './BaseEntity'
import { IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export default class SearchCondition extends BaseEntity {

  @IsInt({message: '页码必须是整数'})
  @Min(1, {message: '页码最小值为1'})
  @Type(() => Number)
  public page: number = 1

  @IsInt({message: '页容量必须是整数'})
  @Min(10, {message: '页容量最小值为10'})
  @Type(() => Number)
  public limit: number = 10

  @Type(() => String)
  public keyword: string = ''

  public static transform(plainObject: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObject)
  }

}