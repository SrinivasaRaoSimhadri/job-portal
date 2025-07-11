import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./layout/Body.jsx";
import Login from "./auth/Login.jsx";
import PageNotFound from "./utils/PageNotFound";
import EntryFeed from "./utils/EntryFeed.jsx";
import appStore from "./store/appStore.jsx";
import LoggedUserFeed from "./utils/LoggedUserFeed.jsx";
import Register from "./auth/Register.jsx";
import Following from "./utils/Following.jsx";
import JobsPosted from "./jobs/JobsPosted.jsx";
import JobsApplied from "./jobs/JobsApplied.jsx";
import ExploreJobs from "./jobs/ExploreJobs.jsx";
import Followers from "./utils/Followers.jsx";
import PostJob from "./jobs/PostJob.jsx";
import ShowProfile from "./profile/ShowProfile.jsx";
import ProfileEdit from "./profile/ProfileEdit.jsx";
import ExploreUsers from "./utils/ExploreUsers.jsx";
import JobApplicants from "./jobs/JobApplicants.jsx";

const App = () => {
    return (
        <Provider store={appStore}>
            <BrowserRouter>
                <Routes>
                    <Route path="/"  element={<Body/>}>
                        <Route index  element={<Login/>}/>
                        <Route path="feed" element={<LoggedUserFeed/>}/>
                        <Route path="auth">
                            <Route index element={<PageNotFound/>}/>
                            <Route path="login"  element={<Login/>}/>
                            <Route path="signup"  element={<Register/>}/>
                        </Route>
                        <Route path="jobs">
                            <Route index element={<PageNotFound/>}/>
                            <Route path="appliedJobs" element={<JobsApplied/>}/>
                            <Route path="explore" element={<ExploreJobs/>}/>
                            <Route path="post-job" element={<PostJob/>}/>
                            <Route path="loggedUser/jobs" element={<JobsPosted/>}/>
                            <Route path="applications/:jobId" element={<JobApplicants/>}/>
                        </Route>
                        <Route path="user">
                            <Route index element={<PageNotFound/>}/>
                            <Route path="following" element={<Following/>}/>
                            <Route path="followers" element={<Followers/>}/>
                            <Route path="explore" element={<ExploreJobs/>}/>
                            <Route path="exploreusers" element={<ExploreUsers/>}/>
                        </Route>
                        <Route path="profile">
                            <Route path=":id" element={<ShowProfile/>}/>
                            <Route path="edit" element={<ProfileEdit/>}/>
                        </Route>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
export default App;