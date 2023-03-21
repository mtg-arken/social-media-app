import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function ProfileTabs(props) {
  return (
    <Tabs
      id="controlled-tab"
      activeKey={props.tab}
      onSelect={(k) => props.setTab(k)}
      className="mb-3"
    >
      <Tab eventKey="Posts" title="Posts" />
      <Tab eventKey="Liked" title="Liked" />
      <Tab eventKey="Comments" title="Comments" />
    </Tabs>
  );
}

export default ProfileTabs;
