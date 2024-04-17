import { useContext, useState } from "react";
import ReactModal from "react-modal";
import HolidayApprovalList from "./HolidayApprovalList";
import HolidayRequestForm from "./HolidayRequestForm";
import ProfileForm from "./ProfileForm";
import currentUserContext from "./CurrentUserContext";
import WorkCalendar from "./WorkCalendar";

const LandingPage = ({pendingHolidayRequests, patchRequestedTimeOff, postRequestedTimeOff, currentUserHolidays}) => {
  
    const [holidayApprovalListModal, setHolidayApprovalListModal] = useState(false);
    const [holidayRequestModal, setHolidayRequestModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);

    const currentUser = useContext(currentUserContext);

    const toggleHolidayApprovalListModal = () => {
        setHolidayApprovalListModal(!holidayApprovalListModal);
    }
    const toggleHolidayRequestModal = () => {
        setHolidayRequestModal(!holidayRequestModal);
    }
    const toggleProfileModal = () => {
        setProfileModal(!profileModal);
    }
    
    return ( 
        <>

            <h2>Welcome {currentUser.currentUser.firstName} 👋🏼 </h2>

            <WorkCalendar currentUserHolidays={currentUserHolidays}/>

            {/* Holiday Approvals list Modal */}
            <button onClick={toggleHolidayApprovalListModal}>Approvals</button>
            <ReactModal
                isOpen={holidayApprovalListModal}
                onRequestClose={toggleHolidayApprovalListModal}
                ariaHideApp={false}
                style={{
                    content: {},
                    overlay: {zIndex: 1000}
                }}
            >
                <HolidayApprovalList pendingHolidayRequests = {pendingHolidayRequests} patchRequestedTimeOff={patchRequestedTimeOff}/>
                <button onClick={toggleHolidayApprovalListModal}>Close</button>
            </ReactModal>

            {/* Holiday Request Form Modal */}
            <button onClick={toggleHolidayRequestModal}>Request Leave</button>
            <ReactModal
                isOpen={holidayRequestModal}
                onRequestClose={toggleHolidayRequestModal}
                ariaHideApp={false}
                style={{
                    content: {},
                    overlay: {zIndex: 1000}
                }}
            >
                <HolidayRequestForm postRequestedTimeOff={postRequestedTimeOff} currentUser={currentUser} />
                <button onClick={toggleHolidayRequestModal}>Close</button>
            </ReactModal>

            {/* Profile Modal */}
            <button onClick={toggleProfileModal}>Profile</button>
            <ReactModal
                isOpen={profileModal}
                onRequestClose={toggleProfileModal}
                ariaHideApp={false}
                style={{
                    content: {},
                    overlay: {zIndex: 1000}
                }}
            >
                <ProfileForm />
                <button onClick={toggleProfileModal}>Close</button>
            </ReactModal>
        </>
     );
}
 
export default LandingPage;