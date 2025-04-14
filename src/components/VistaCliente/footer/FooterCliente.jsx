import { Grid2 , Box, IconButton, Typography, Link } from "@mui/material";
import { Facebook, Instagram, MusicNote, LocationOn, Mail, Phone, WhatsApp } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#203500", color: "white", py: 4, px: 2, border: "2px solid red" }}>
      <Grid2  container spacing={3} justifyContent="center">
        
        {/* Sección de Contacto */}
        <Grid2 item xs={12} sm={4} sx={{ textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#745f19' }}> 
            Contacto
          </Typography>
          <Box mt={1.5}>
            <Typography variant="body2">
              <LocationOn fontSize="small" /> Liberia, Costado oeste del Banco Popular
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2">
              <Mail fontSize="small" /> mrcaddiewolf@gmail.com
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
        <Grid2 item xs={12} sm={4} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#745f19', textAlign: 'left' }}>
            Acerca de
          </Typography>
          <Box mt={1.5} sx={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 auto',  textAlign: 'left' }}>
            <Typography variant="body2">
              Mr. Wolf nació con la idea de ofrecer ropa de calidad y estilo único para el hombre moderno con marcas 100 % costarricenses.
            </Typography>
          </Box>
        </Grid2>

        {/* Redes Sociales */}
        <Grid2 item xs={12} sm={4} sx={{ textAlign: 'right' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#745f19', textAlign: 'left' }}>
            Síguenos en
          </Typography>
          <Box mt={1.5}>
            <IconButton href="https://tr.ee/ZrtwYzikmC" target="_blank" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="https://www.facebook.com/share/Ft1ZEnf3eZqZeW2y/?mibextid=LQQJ4d" target="_blank" color="inherit">
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
        <Typography variant="body2" sx={{ color: '#745f19' }}>
          © {new Date().getFullYear()} Mr. Wolf - Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
