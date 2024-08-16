import React from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";

function ZoomImage(props) {
  return (
    <div>
      <InnerImageZoom
        src={props.source}
        zoomSrc={props.source}
        zoomType="hover"
        zoomPreload={true}
      />
    </div>
  );
}

export default ZoomImage;
