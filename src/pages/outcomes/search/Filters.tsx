import { Button, DatePicker, Select } from "antd";
import styled from "styled-components";
import { TransactionType } from "../../../@types";
import { theme } from "../../../Theme";

const { RangePicker } = DatePicker;
type Selector =  TransactionType  | '';

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
    <TypeSelector onSelect={() => {}} clearSelect={() => {}} disabled={false} />
    <Button type='primary'>Apply</Button>
</FiltersContainer>;

const TypeSelectorWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const TypeSelector = ({
  onSelect,
  clearSelect,
  disabled
}: {
  onSelect: (text: Selector) => void
  clearSelect: () => void;
  disabled: boolean;
}): JSX.Element => <TypeSelectorWrapper>
  <Select
    allowClear
    onClear={clearSelect}
    disabled={disabled}
    placeholder={'Type'}
    style={{ backgroundColor: theme.colors.grays.light, flex: 3 }}
    dropdownStyle={{ backgroundColor: theme.colors.grays.light }}
    onSelect={onSelect}
    options={[
      { value: 'current', label: 'Current' },
      { value: 'fixed', label: 'Fixed' }
    ]}
  />
</TypeSelectorWrapper>;