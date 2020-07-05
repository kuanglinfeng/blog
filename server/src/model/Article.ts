import { ArrayMinSize, IsArray, IsDate, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import BaseEntity from './BaseEntity'

class Article extends BaseEntity {

  @IsNotEmpty({ message: '文章标题不可以为空' })
  // 运行时的类型约束
  @Type(() => String)
  public title: string

  @IsNotEmpty({ message: '文章标签不可以为空' })
  @ArrayMinSize(1, { message: '文章标签至少有一个' })
  // 文档建议如果是字符串的数组，使用字符串约束更好，因为js其实不存在数字数组，字符串数组等
  @Type(() => String)
  // 上面虽然解决了不是字符串的数组的问题，但是如果传进来的是一个字符串呢？这就太tm难了，所以再在编译时检查一下算了吧，运行时不管了
  @IsArray({ message: '文章标签必须是一个数组' })
  public tagList: string[]

  @IsNotEmpty({ message: '发布日期不可以为空' })
  @IsDate()
  @Type(() => Date)
  public publishTime: Date

  @IsNotEmpty({ message: '文章内容不可以为空' })
  @Type(() => String)
  public content: string

  public static transform(plainObject: object): Article {
    return super.baseTransform(Article, plainObject)
  }
}

export default Article