
"use client";

import { Carousel } from "flowbite-react";
import Row from "../Row/Row";

export default function Component({children}) {
  return (
    <Row>
      <Carousel>
        {children}
      </Carousel>
    </Row>
  );
}
