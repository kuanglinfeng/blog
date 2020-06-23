import { IsDate, IsNotEmpty } from 'class-validator'


class Article {

  @IsNotEmpty({message: '文章标题不可以为空'})
  public title: string = ''

  @IsNotEmpty({message: '文章标签不可以为空'})
  public tag: string = ''

  @IsNotEmpty({message: '发布日期不可以为空'})
  @IsDate()
  public publishTime: Date = new Date()

  @IsNotEmpty({message: '文章内容不可以为空'})
  public content: string = ''
}

export default Article