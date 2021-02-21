import { DateTime } from 'luxon';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TimeAndRankingRaw } from '../../helpers/interfaces';
import axios from 'axios'
import { RootState } from '../reducers';
import { getTimingsAction, timingsErrorAction } from '../reducers/timingsReducer';

const getTimings = (): ThunkAction<Promise<void>, RootState, undefined, Action> => async dispatch => {
  try{
    const url = 'https://toilet-a075.restdb.io/rest/timings';
    const timings = await axios.get(url, {
      headers: {
        "x-api-key": "601f19033f9eb665a1689200"
      }
    });

    const data: TimeAndRankingRaw[] = timings.data;
    const formattedData = data.map(x => ({
      time: DateTime.fromFormat(x.DateTime, 'yyyy/LL/dd hh:mm'),
      ranking: x.Ranking
    }));

    dispatch(getTimingsAction(formattedData))
  }
  catch(error){
    dispatch(timingsErrorAction(error))
  }
};

export default getTimings;
