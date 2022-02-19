import "../styles/globals.css";
import { AgaveContainer } from "@x99minutos/agave-material";
import "@x99minutos/agave-material/dist/index.css";
import { Typography } from "@mui/material";

function MyApp({ Component, pageProps }) {
	return (
		<AgaveContainer>
			<Component {...pageProps} />
		</AgaveContainer>
	);
}

export default MyApp;
