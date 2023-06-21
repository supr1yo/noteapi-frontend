import {
    User,
    Navbar,
} from "@nextui-org/react";


import LogoutButton from "./LogOut";
import CreateNewNote from "./NewNote";

// eslint-disable-next-line react/prop-types
const Header = ({ avatarURL, username, createdAt }) => {
    

    return (

        <Navbar>
            <Navbar.Brand>
                {/* <Avatar
                    size="lg"
                    src={avatarURL || "https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                    color="primary"
                    bordered
                />
                <Spacer y={2} />
                <Text b color="inherit" hideIn="xs">
                    {username}
                </Text> */}
                <User
                    src={avatarURL || "https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                    name={username}
                    description={`User since ${createdAt.toString()}`}
                    bordered
                    zoomed
                    color="primary"
                />
            </Navbar.Brand>
            <Navbar.Content>
                <CreateNewNote />
                <LogoutButton />

            </Navbar.Content>
        </Navbar>
    )
}

export default Header;