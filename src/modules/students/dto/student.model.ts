import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserModel } from "src/modules/users/dto/user.model";


@ObjectType()
export class StudentModel {
    @Field(() => ID)
    id: string;

    @Field(() => UserModel)
    user: UserModel;

    @Field()
    classId: string;
}