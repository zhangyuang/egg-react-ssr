import dva from 'dva';
import models from './models';

let dvaForServer;
const originModelsData = {}

const initDvaForServer = (options) => {
    if (dvaForServer) {
        dvaForServer._store.dispatch({ type: 'SEVERRESET' });
        return dvaT
    }
    const app = dva({
        ...options,
        onReducer: reducer => {
            return (state, action) => {
                const newState = action.type === 'SEVERRESET' ? originModelsData : reducer(state, action);
                return { ...newState, routing: newState.routing };
            };
        }
    })
    models.forEach((m) => {
        originModelsData[`${m.namespace}`] = m.state;
        app.model(m)
    })
    app.router(() => { })
    app.start()
    dvaForServer = app
    return app
}

export default initDvaForServer;