import { useEffect, useState } from "react";
import Datepicker from "../common/Datepicker";
import Dropdown from "../common/Dropdown";
import Navbar from "../header/navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchSportsData } from "../../services/sportSlice";
import { fetchCoachName } from "../../services/coachSlice";
import { fetchAvailableTimeSlot } from "../../services/availableTimeSlotSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCoach, setSelectedCoach] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const {
    loading: sportLoading,
    specialization,
    error: sportError,
  } = useSelector((state) => state.sportType);

  const {
    loading: coachLoading,
    coaches,
    error: coachError,
  } = useSelector((state) => state.coaches);

  const {
    loading: availableTimeSlotLoading,
    time_slot,
    error: availableTimeSlotError,
  } = useSelector((state) => state.time_slot);

  useEffect(() => {
    dispatch(fetchSportsData());
    dispatch(fetchCoachName());
    dispatch(fetchAvailableTimeSlot());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid p-5 grid-cols-1 sm:grid-cols-5 gap-2 justify-center items-center">
          {/* Dropdowns */}
          <div>
            <Dropdown
              label="Type of Sport"
              options={Array.isArray(specialization) ? specialization : []}
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            />
          </div>
          <div>
            <Dropdown
              label="Date"
              isDate
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div>
            <Dropdown
              label="Time"
              options={
                Array.isArray(time_slot)
                  ? time_slot.map((slot) => slot.time_slot)
                  : []
              }
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <div>
            <Dropdown
              label="Coach"
              options={
                Array.isArray(coaches)
                  ? coaches.map(
                      (coach) => `${coach.firstName} ${coach.lastName}`
                    )
                  : []
              }
              value={selectedCoach}
              onChange={(e) => setSelectedCoach(e.target.value)}
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="bg-[#9EF300] rounded-lg w-full h-12 mt-1"
          >
            Find Workout
          </button>
        </div>
      </form>
    </>
  );
}
