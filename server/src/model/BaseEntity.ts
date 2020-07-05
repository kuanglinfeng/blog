import { validate } from 'class-validator'
import { ClassType } from 'class-transformer/ClassTransformer'
import { plainToClass } from 'class-transformer'

export default abstract class {

  /**
   * 验证当前文章对象(this)，Promise中的泛型是Promise得到的数据类型，string数组为0表示验证通过
   * @param skipMissing 是否跳过那些没有填写的属性
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, { skipMissingProperties: skipMissing })
    const constraints = errors.map(error => Object.values(error.constraints!))
    const formatConstraints: string[] = []
    constraints.forEach(constraints => {
      formatConstraints.push(...constraints)
    })
    return formatConstraints
  }

  /**
   * 静态方法，将一个平面对象转为一个指定的类对象
   * @param targetClass 要转为的对象的类名
   * @param plainObject 平面对象
   * @return 指定的类对象
   */
  protected static baseTransform<T>(targetClass: ClassType<T>, plainObject: object): T {
    if (plainObject instanceof targetClass) {
      return plainObject
    }
    return plainToClass(targetClass, plainObject)
  }
}