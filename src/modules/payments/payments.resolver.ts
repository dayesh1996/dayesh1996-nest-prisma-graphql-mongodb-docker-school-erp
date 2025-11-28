import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { PaymentModel } from './dto/payment.model';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Resolver(() => PaymentModel)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => PaymentModel)
  createPayment(@Args('createPaymentInput') createPaymentInput: CreatePaymentInput) {
    return this.paymentsService.create(createPaymentInput);
  }

  @Query(() => [PaymentModel], { name: 'payments' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Query(() => PaymentModel, { name: 'payment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.paymentsService.findOne(id);
  }

  @Query(() => [PaymentModel], { name: 'paymentsByStudent' })
  findByStudentId(@Args('studentId', { type: () => ID }) studentId: string) {
    return this.paymentsService.findByStudentId(studentId);
  }

  @Mutation(() => PaymentModel)
  updatePayment(
    @Args('id', { type: () => ID }) id: string,
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ) {
    return this.paymentsService.update(id, updatePaymentInput);
  }

  @Mutation(() => PaymentModel)
  removePayment(@Args('id', { type: () => ID }) id: string) {
    return this.paymentsService.remove(id);
  }
}
