import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user"
import * as NoteApi from "../network/notes_api"

interface NavBarLoggedInViewProps{
    user: User,
    onLogoutSuccessfull: () => void
}

const NavBarLoggedInView = ({user,onLogoutSuccessfull}:NavBarLoggedInViewProps) => {
    async function logout() {
        try {
            await NoteApi.logout();
            onLogoutSuccessfull();
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed In as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log Out</Button>
        </>
    )
}

export default NavBarLoggedInView