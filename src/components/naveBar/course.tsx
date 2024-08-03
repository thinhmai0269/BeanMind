// import React, { useState } from "react";
// import {
//   Image,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Drawer from "../drawer/profile";
// import { IconButton } from "react-native-paper";

// const CustomHeader = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
         
//         }}
//       >
//         <TouchableOpacity onPress={toggleDrawer}>
//           <IconButton
//             icon={"format-list-bulleted"}
//             iconColor="black"
//             size={20}
//           />
//         </TouchableOpacity>
//         <View style={{ width: "100%", flexDirection: "row" }}>
//           <Image
//             style={[{
//               height: 38,
//               width: 38,
//               marginRight: 5,
//               borderRadius: 20,
//             }]}
//             source={{
//               uri: "https://reactnative.dev/img/tiny_logo.png",
//             }}
//           />
//           <View style={styles.headerTitle}>
//             <Text
//               style={[ {
//                 fontWeight: "900",
//                 fontSize: 21,
//                 color: "blue",
//               }]}
//             >
//               BEAN MIND
//             </Text>
//           </View>
//         </View>
//       </View>

//       <Drawer visible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     height: 60,
//     backgroundColor: "white",
//     alignItems: "center",
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     paddingTop: 50,
//   },
//   headerTitle: {
//     marginTop:5,
//     marginBottom:5
//   },
//   drawerButton: {
//     color: "white",
//     fontSize: 14,
//     marginLeft: 20,
//   },
// });

// export default CustomHeader;
