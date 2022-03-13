import {useState} from "react";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import {useDispatch} from "react-redux";
import {Tunings, TuningStrings} from "../types/tunerReducer";

export default function TuningPicker() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {tuning} = useTypedSelector(state => state.tuner);
  const dispatch = useDispatch();


  const changeTuning = (tuning: string) => () => {
    dispatch({type: "SET_TUNING", payload: tuning});
    dispatch({type: "SET_TUNING_STRINGS", payload: TuningStrings[tuning as keyof typeof TuningStrings]});
    setDropdownOpen(!dropdownOpen)
  };

  const renderTunings = () => {
    return Object.keys(Tunings).map(tun => {
      if(tuning === tun)
        return;
      return (
        <li
          key={tun}
          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          onClick={changeTuning(tun)}>
          {tun}
        </li>
      );
    });
  };

  return (
    <div className={'relative'}>
      <button id="dropdownButton"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-text-accent font-medium text-2xl rounded-lg text-sm px-4 py-2.5 mt-4 text-center inline-flex items-center"
              type="button">{tuning}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div id="dropdown"
           className={`${dropdownOpen ? 'absolute' : 'hidden'} blo z-10 w-44 text-base text-2xl list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-grey-dark`}>
        <ul className="py-1 cursor-pointer">
          {renderTunings()}
        </ul>
      </div>
    </div>
  )
}
