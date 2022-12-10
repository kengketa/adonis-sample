import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class CreateOrUpdateUserRequest {
  public async validate(request){
    const validatedRequest = await request.validate({
      schema: schema.create({
        email: schema.string({},[
          rules.unique({
            table: 'users',
            column: 'email',
            caseInsensitive: true,
          })
        ]),
        password: schema.string([
          rules.confirmed(),
          rules.minLength(6)
        ])
      })
    })
    return validatedRequest;
  }
}
