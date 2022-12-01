import React from 'react'
import { Center, Loader } from "@mantine/core"

 export default function LoaderComp() {
  return (
      <>
          <Center
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: "0px",
          top: "0px",
        }}
      >
        <Loader size="lg" color="#ED4D31" variant="bars" />
      </Center>
      </>
  )
}

 