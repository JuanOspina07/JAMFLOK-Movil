import { StyleSheet, Dimensions, Platform } from "react-native";
import colors from "./colors";
import typography from "./fonts";
const { width, height } = Dimensions.get("window");

export const MAX_SCROLL_HEIGHT = Math.min(Math.round(height * 0.4), 350);
const SCROLLBAR_WIDTH = 8;
const SCROLLBAR_MARGIN_RIGHT = 6;

export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "ios" ? 2 : 16,
  },
  backTopLeft: {
    position: "absolute",
    top: Platform.OS === "ios" ? 9 : 40, 
    left: 12,
    zIndex: 50,
    padding: 8,
    backgroundColor: "transparent",
  },
  mainContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  card: {
    width: "100%",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  cardInner: {
    width: "92%",
    backgroundColor: colors.cardInnerLight || "#ede9e6",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "flex-start",
    alignSelf: "center",
  },
  logo: {
    width: 84,
    height: 84,
    marginBottom: 8,
    alignSelf: "center",
    resizeMode: "contain",
  },
  title: {
    alignSelf: "center",
    fontFamily: typography.bold || undefined,
    fontSize: 20,
    color: colors.primary || "#293a50",
    marginTop: 6,
    marginBottom: 12,
    textAlign: "center",
  },
  sectionTitle: {
    fontFamily: typography.medium || typography.bold || undefined,
    fontSize: 15,
    color: colors.primary || "#2b6cb0",
    marginBottom: 6,
    marginTop: 8,
    letterSpacing: 0.12,
  },
  subtitle: {
    fontFamily: typography.regular || undefined,
    fontSize: 14,
    color: colors.primary || "#293a50",
    textAlign: "justify",
    lineHeight: 20,
    marginBottom: 10,
  },
  scrollContent: {
    width: "100%",
    paddingBottom: 12,
    paddingHorizontal: 6,
  },
  scrollArea: {
    width: "100%",
    marginTop: 10,
    marginBottom: 6,
  },
  scrollContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "stretch",
    height: "100%",
  },
  scrollbarTrack: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: SCROLLBAR_MARGIN_RIGHT,
    width: SCROLLBAR_WIDTH,
    borderRadius: 10,
    backgroundColor: colors.scrollbarTrack || "rgba(0,0,0,0.06)",
    overflow: "hidden",
    zIndex: 60,
  },
  scrollbarThumb: {
    position: "absolute",
    left: 0,
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.scrollbarThumb || (colors.primary || "#2b6cb0"),
  },
  bulletList: {
    width: "100%",
    marginLeft: 8,
    marginBottom: 8,
  },
  bulletItem: {
    fontFamily: typography.regular || undefined,
    fontSize: 14,
    color: colors.primary || "#293a50",
    textAlign: "left",
    lineHeight: 20,
    marginBottom: 2,
  },
});