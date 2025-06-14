import { Grid2, Box, IconButton, Typography, Link, } from "@mui/material";
import { Facebook, Instagram, MusicNote, LocationOn, Mail, Phone, WhatsApp } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#203500", color: "white", py: 4, px: { xs: 2, sm: 8, md: 12 } }}>
      <Grid2 container spacing={4} justifyContent="space-between" alignItems="flex-start">
        
        {/* Sección de Contacto */}
        <Grid2 item xs={12} sm={4} sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#A9802A', textAlign: "left" }}>
            Contacto
          </Typography>
          <Box mt={1.5}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: "center", sm: "flex-start" } }}>
              <LocationOn fontSize="small" /> Liberia, Costado oeste del Banco Popular
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: "center", sm: "flex-start" } }}>
              <Mail fontSize="small" /> mrcaddiewolf@gmail.com
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: "center", sm: "flex-start" } }}>
              <Phone fontSize="small" /> +506 2101-9480 (solo llamadas)
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: "center", sm: "flex-start" } }}>
              <WhatsApp fontSize="small" />
              <Link href="https://wa.me/50685574555" color="inherit" underline="none" target="_blank">
                +506 8557-4555
              </Link>
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: "center", sm: "flex-start" } }}>
              <WhatsApp fontSize="small" />
              <Link href="https://wa.me/50670912623" color="inherit" underline="none" target="_blank">
                +506 7091-2623
              </Link>
            </Typography>
          </Box>
        </Grid2>

        {/* Sección de Información */}
        <Grid2 item xs={12} sm={4} sx={{ textAlign: "center", px: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#A9802A', textAlign: "left" }}>
            Acerca de
          </Typography>
          <Box mt={1.5} sx={{ maxWidth: 320, mx: "auto", textAlign: "left"}}>
            <Typography variant="body2">
              Mr. Wolf nació con la idea de ofrecer ropa de calidad y estilo único para el hombre moderno con marcas 100 % costarricenses.
            </Typography>
          </Box>
        </Grid2>

        {/* Redes Sociales */}
        <Grid2 item xs={12} sm={4} sx={{ textAlign: { xs: "center", sm: "right" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#A9802A', textAlign: "left" }}>
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
        </Grid2>

      </Grid2>

      {/* Copyright */}
      <div className="border-t border-[#ffffff20] mt-10 pt-5 text-center text-xs text-[#A9802A]">
        © {new Date().getFullYear()} Mr. Wolf - Todos los derechos reservados.
      </div>
    </Box>
  );
};

export default Footer;
