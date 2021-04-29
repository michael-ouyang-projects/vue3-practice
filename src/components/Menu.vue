<template>
  <DockMenu
    :items="items"
    :on-selected="handleSelected"
    :theme="{
      primary: 'burlywood',
      secondary: 'cornsilk',
      textColor: 'black',
      tertiary: 'burlywood',
      textHoverColor: 'white',
    }"
  />
</template>

<script>
import { DockMenu } from "vue-dock-menu";
import "vue-dock-menu/dist/vue-dock-menu.css";

export default {
  components: {
    DockMenu,
  },
  props: {
    changeShowingType: null,
  },
  setup(props) {
    const handleSelected = () => {
      props.changeShowingType()
    }
    return {
      handleSelected,
      items: [
        {
          name: "Type",
          menu: [{ name: "Practice" }, { name: "Product" }],
        },
        {
          name: "Asia",
          menu: [
            { name: "China" },
            { name: "Japan" },
            { name: "South Korea" },
            { name: "Thailand" },
            { name: "Vietnam" },
          ],
        },
        {
          name: "Africa",
          menu: [{ name: "South Africa" }, { name: "Kenya" }],
        },
        {
          name: "Europe",
          menu: [
            { name: "United Kingdom" },
            { name: "Germany" },
            { name: "France" },
            { name: "Italy" },
          ],
        },
        {
          name: "North America",
          menu: [{ name: "United States" }, { name: "Canada" }],
        },
        {
          name: "Australia",
          menu: [{ name: "Australia " }, { name: "New Zealand" }],
        },
      ],
    }
  }
};
</script>

<style>
</style>
