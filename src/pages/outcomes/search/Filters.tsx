import { Button, DatePicker, Select } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";

const { RangePicker } = DatePicker;

const FiltersContainer = styled.div<{ visible: boolean }>`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: ${p => p.visible ? '126' : '0'}px;
	overflow: hidden;
	transition: height .5s ease-in-out;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Filters = ({
	visible
}: {
	visible: boolean;
}): JSX.Element => <FiltersContainer visible={visible}>
  <RangePicker
    style={{
      width: '100%',
      margin: '0 5px'
    }}
    allowClear
    onCalendarChange={(values) => console.log(values)}
    />
  <Select
    allowClear
    onClear={() => {}}
    disabled={false}
    placeholder={'Type'}
    style={{
      width: '100%',
      padding: '10px 0'
    }}
    dropdownStyle={{ backgroundColor: theme.colors.grays.light }}
    onSelect={() => {}}
    options={[
      { value: 'current', label: 'Current' },
      { value: 'fixed', label: 'Fixed' }
    ]}
  />
  <Button type='primary'>Apply</Button>
</FiltersContainer>;
