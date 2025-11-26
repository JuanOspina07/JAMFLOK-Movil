import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientBackground from "../../hooks/gradientBackground";
import { useLoadFonts } from "../../hooks/loadFonts";
import colors from "../../styles/colors";
import styles from "../../styles/styleInformation";

export default function Information() {
  const navigation = useNavigation();
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return (
      <GradientBackground>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#404040" /> {/* Cambiado a gris oscuro */}
        </View>
      </GradientBackground>
    );
  }

  const informationData = {
    title: "Nuestra empresa",
    sections: [
      {
        title: "¿Quiénes somos?",
        content: "JAMFLOK es mucho más que una simple plataforma de comercio electrónico. Nacimos con la visión de cerrar la brecha entre los pequeños y medianos negocios y la tecnología, creando un ecosistema digital donde cualquier persona, sin importar su nivel técnico o capital inicial, pueda lanzar su negocio, conectarse con clientes y crecer de manera sostenible. Nuestra plataforma se construyó pensando en los emprendedores locales, en los negocios familiares, en los estudiantes con ideas innovadoras y en los profesionales que desean modernizar su modelo comercial. JAMFLOK es una respuesta a los desafíos del comercio tradicional. Frente a la informalidad, la desorganización y la falta de presencia digital, nosotros ofrecemos estructura, visibilidad y herramientas fáciles de usar. Nuestro objetivo es democratizar el acceso al comercio digital y hacer de cada vendedor un protagonista del cambio económico de su comunidad."
      },
      {
        title: "Misión",
        content: "En JAMFLOK trabajamos día a día con la firme misión de facilitar el acceso al comercio electrónico de manera segura, eficiente y transparente. Queremos que cualquier persona, desde un joven emprendedor hasta una empresa consolidada, pueda ofrecer sus productos y servicios en internet sin complicaciones. No creemos en barreras, sino en puentes: puentes entre la tecnología y la comunidad, entre la innovación y lo cotidiano. Nuestra plataforma está diseñada para ofrecer una experiencia de usuario intuitiva que permita publicar, editar, organizar y vender productos en cuestión de minutos. Además, nos enfocamos en brindar soporte constante, formación gratuita y acompañamiento técnico a quienes lo necesiten. De este modo, transformamos la experiencia de vender en línea en algo accesible, humano y sostenible."
      },
      {
        title: "Visión",
        content: "Nuestra visión a mediano y largo plazo es posicionar a JAMFLOK como el referente principal del comercio electrónico local en Colombia y América Latina. Buscamos crear una comunidad digital autosostenible, donde miles de negocios se impulsen mutuamente, compartan buenas prácticas y generen oportunidades de empleo, desarrollo e innovación tecnológica. Imaginamos un futuro en el que cualquier mercado físico tenga su versión digital en JAMFLOK, fortaleciendo su presencia sin abandonar su esencia cultural. Queremos llegar a los rincones más alejados del país, donde el acceso a internet apenas inicia, y brindar allí una solución que permita el crecimiento económico desde lo local hacia lo global. Apostamos por la transformación digital con sentido humano, una transformación que eleve la calidad de vida de quienes deciden emprender."
      },
      {
        title: "¿Qué ofrecemos?",
        content: `• Registro gratuito e inclusivo: cualquier usuario puede crear una cuenta personal o empresarial sin pagar ningún costo de entrada. Incentivamos la participación de nuevos talentos emprendedores.

• Gestión integral de productos: desde agregar imágenes y descripciones hasta monitorear el stock, configurar precios, y activar promociones o combos personalizados.

• Carritos de compra y pedidos en tiempo real: el cliente puede agregar múltiples productos, calcular totales automáticos y finalizar la compra fácilmente.

• Soporte técnico humanizado: contamos con un equipo dedicado a responder dudas, resolver inconvenientes y formar usuarios en el uso de la plataforma.

• Pasarela de pagos integradas: con métodos modernos como Nequi, Bancolombia, tarjetas débito/crédito, transferencias, y pagos en efectivo al recibir.

• Panel administrativo personalizado: para que cada empresa revise estadísticas de ventas, comportamiento de los clientes, productos más vendidos y reseñas recibidas.

• Seguridad y privacidad: garantizamos que toda la información personal y financiera sea cifrada y protegida mediante estándares de seguridad reconocidos internacionalmente.

• Publicidad local interna: los usuarios pueden pagar por destacar su negocio en la portada o recibir menciones en campañas por redes sociales.`
      },
      {
        title: "Valores corporativos",
        content: `• Empatía: entendemos los retos del emprendimiento desde la experiencia, y por eso buscamos soluciones reales para personas reales.

• Equidad: tratamos a todos nuestros usuarios con el mismo respeto y ofrecemos las mismas oportunidades de crecimiento a negocios grandes y pequeños.

• Innovación con propósito: desarrollamos tecnología no solo por ser moderna, sino por resolver necesidades concretas de la comunidad.

• Transparencia: comunicamos nuestros términos, políticas y cambios con claridad para fomentar una relación basada en la confianza mutua.

• Adaptabilidad: nos actualizamos constantemente con base en las sugerencias de nuestros usuarios y las tendencias del mercado.`
      }
    ]
  };

  return (
    <GradientBackground>
      <View style={styles.screen}>
        <View style={styles.mainContent}>
          <View style={styles.card}>
            <ScrollView 
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <Image 
                source={require("../../../assets/images/logo.png")} 
                style={styles.logo} 
              />
              
              <Text style={styles.title}>{informationData.title}</Text>
              
              {informationData.sections.map((section, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionContent}>{section.content}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}