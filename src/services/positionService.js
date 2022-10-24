import { Subject } from 'rxjs';

const subject = new Subject();

export const positionService = {
    propagatePositions: buslines => subject.next(buslines),
    clearPositions: () => subject.next(),
    getPosition: () => subject.asObservable()
};