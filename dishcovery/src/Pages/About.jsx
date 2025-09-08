import Navbar from "../Components/Navbar";

export default function About() {
    return (
        <>
            <Navbar />
            <div style={styles.container}>
                {/* Empty for now, you can add About content later */}
            </div>
        </>
    );
}

const styles = {
    container: {
        padding: "40px 80px",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "100px",
    },
};
