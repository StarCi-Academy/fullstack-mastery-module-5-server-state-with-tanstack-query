import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common"
import { Observable } from "rxjs"
import { delay } from "rxjs/operators"
import { DEFAULT_RESPONSE_DELAY_MS } from "../constants"

/**
 * Delays every users API response so learners can observe loading/skeleton UI.
 */
@Injectable()
export class ResponseDelayInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(delay(DEFAULT_RESPONSE_DELAY_MS))
    }
}
