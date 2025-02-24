import { Grid2 , Box, IconButton, Typography, Link } from "@mui/material";
import { Facebook, Instagram, MusicNote, LocationOn, Mail, Phone, WhatsApp } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#1A2E05", color: "white", py: 4, px: 2 }}>
      <Grid2  container spacing={3} justifyContent="center">
        
        {/* Sección de Contacto */}
        <Grid2  item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contacto
          </Typography>
          <Box mt={1.5}>
            <Typography variant="body2">
              <LocationOn fontSize="small" /> Liberia, Costado oeste del Banco Popular
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2">
              <Mail fontSize="small" /> contacto@mrwolf.com
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2">
              <Phone fontSize="small" /> +506 2101-9480 (solo llamadas)
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2">
              <WhatsApp fontSize="small" />{" "}
              <Link href="https://wa.me/50685574555" color="inherit" underline="none" target="_blank">
                +506 8557-4555
              </Link>
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2">
              <WhatsApp fontSize="small" />{" "}
              <Link href="https://wa.me/50670912623" color="inherit" underline="none" target="_blank">
                +506 7091-2623
              </Link>
            </Typography>
          </Box>
        </Grid2 >

        {/* Sección de Información */}
        <Grid2  item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Acerca de la
          </Typography>
          <Box mt={1.5}>
            <Typography variant="body2">
              Mr. Wolf nació con la idea de ofrecer ropa de calidad y estilo único para el hombre moderno con marcas 100 % costarricenses.
            </Typography>
          </Box>
        </Grid2 >

        {/* Redes Sociales */}
        <Grid2  item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Síguenos en
          </Typography>
          <Box mt={1.5}>
            <IconButton href="https://instagram.com/mrwolf.cr" target="_blank" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="https://facebook.com/Mr.wolf" target="_blank" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="https://tiktok.com/mrwolf.cr" target="_blank" color="inherit">
              <MusicNote />
            </IconButton>
          </Box>
        </Grid2 >

      </Grid2 >

      {/* Copyright */}
      <Box textAlign="center" mt={3}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Mr. Wolf - Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
