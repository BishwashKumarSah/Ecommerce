import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
  const [price, setPrice] = React.useState([0, 100000]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let newPrice;
    if (activeThumb === 0) {
      newPrice = [Math.min(newValue[0], price[1] - minDistance), price[1]];
    } else {
      newPrice = [price[0], Math.max(newValue[1], price[0] + minDistance)];
    }

    setPrice(newPrice);
  };

  return (
    <Box className="slider_width">
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={price}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        max={100000}
        size="small"
      />
    </Box>
  );
}
