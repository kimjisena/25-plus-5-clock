function inc (state, label) {
    let key = label === 'Session' ? 'session' : 'break';

    if (state.active === label) {
        if (state[key] < 3600) {
            return {
                ...state,
                counter: state[key] + 60,
                [key]: state[key] + 60,
            };
        }
    } else {
        if (state[key] < 3600) {
            return {
                ...state,
                [key]: state[key] + 60,
            };
        }
    }
    return state;
}

function dec (state, label) {
    let key = label === 'Session' ? 'session' : 'break';

    if (state.active === label) {
        if (state[key] > 60) {
            return {
                ...state,
                [key]: state[key] - 60,
                counter: state[key] - 60,
            };
        }
    } else {
        if (state[key] > 60) {
            return {
                ...state,
                [key]: state[key] - 60,
            };
        }
    }
    return state;
}

export default function reducer (state, action) {
    switch(action.type) {
        case 'break-increment':
            return inc(state, 'Break');
        case 'break-decrement':
            return dec(state, 'Break');
        case 'session-increment':
            return inc(state, 'Session');
        case 'session-decrement':
            return dec(state, 'Session');
        case 'counter-decrement':
            return {
                ...state,
                counter: state.counter - 1,
            };
        case 'reset':
            return {
                counter: 1500,
                session: 1500,
                break: 300,
                active: 'Session',
                disabled: false,
            };
        case 'flip': {
            if (state.active === 'Session') {
                return {
                    ...state,
                    active: 'Break',
                    counter: state.break,
                };
            } else {
                return {
                    ...state,
                    active: 'Session',
                    counter: state.session,
                };
            }
        }
        case 'disable':
            return {
                ...state,
                disabled: action.payload,
            };
        default:
            return state;
    }
}