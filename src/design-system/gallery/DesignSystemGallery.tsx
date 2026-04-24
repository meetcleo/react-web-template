import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSafeArea } from '../../shell';
import {
  AddressField,
  AlertModal,
  AmountInput,
  BottomSheet,
  Button,
  Calendar,
  CheckBox,
  CleoLogo,
  CreditCardInputField,
  DateField,
  Divider,
  ListGroup,
  ListItem,
  HStack,
  IconButton,
  InputField,
  LineIcon,
  LoadingSpinner,
  NIInput,
  PhoneNumberInput,
  PickerSelect,
  ProgressBar,
  ProgressIndicator,
  Radio,
  SegmentedControl,
  SSNInput,
  SelectableChip,
  Skeleton,
  Stepper,
  TabBar,
  TabNavigation,
  Tag,
  Tile,
  Toggle,
  Typography,
  VStack,
} from '../components';
import { allIconNames } from '../components/LineIcon';
import { Spacing, typographySizeMap } from '../tokens';
import type { TypographySize, TypographyType } from '../tokens';
import { useTheme } from '../theme';

type Category = 'type' | 'icons' | 'actions' | 'forms' | 'display' | 'nav' | 'logo' | 'overlays';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'type', label: 'Type' },
  { value: 'icons', label: 'Icons' },
  { value: 'actions', label: 'Actions' },
  { value: 'forms', label: 'Forms' },
  { value: 'display', label: 'Display' },
  { value: 'nav', label: 'Nav' },
  { value: 'logo', label: 'Logo' },
  { value: 'overlays', label: 'Overlays' },
];

const ICON_NAMES = [...allIconNames].sort((a, b) => a.localeCompare(b));

const TYPE_ORDER: TypographyType[] = [
  'display',
  'displayNumbers',
  'headline',
  'title',
  'titleStrong',
  'body',
  'bodyStrong',
  'bodyLink',
  'label',
  'labelStrong',
  'buttonLabel',
];

const SIZE_ORDER: TypographySize[] = ['L', 'M', 'S', 'XS'];

const SAMPLE_TEXT: Record<TypographyType, string> = {
  display: 'Display',
  displayNumbers: '1,234',
  headline: 'Headline',
  title: 'Title',
  titleStrong: 'Title Strong',
  body: 'The quick brown fox.',
  bodyStrong: 'Body Strong',
  bodyLink: 'Body Link',
  label: 'Label',
  labelStrong: 'Label Strong',
  buttonLabel: 'Button Label',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <VStack gap="XS" align="stretch">
    <Typography type="labelStrong" size="M" uppercase color="var(--content-tertiary)">
      {title}
    </Typography>
    {children}
    <div style={{ paddingTop: Spacing.XS, paddingBottom: Spacing.L }}>
      <Divider />
    </div>
  </VStack>
);

export const DesignSystemGallery: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { theme, setTheme } = useTheme();
  const insets = useSafeArea();
  const [category, setCategory] = useState<Category>('type');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState<'a' | 'b'>('a');
  const [toggleValue, setToggleValue] = useState(true);
  const [segment, setSegment] = useState<'one' | 'two' | 'three'>('one');
  const [chip, setChip] = useState<'apple' | 'berry' | 'citrus'>('berry');
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('12.50');
  const [date, setDate] = useState('2026-04-23');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [card, setCard] = useState('');
  const [phone, setPhone] = useState('');
  const [ssn, setSsn] = useState('');
  const [ni, setNi] = useState('');
  const [address, setAddress] = useState('');
  const [picked, setPicked] = useState<'apple' | 'banana' | 'cherry'>('apple');
  const [stepperValue, setStepperValue] = useState('5');
  const [tab, setTab] = useState<'home' | 'cash' | 'insights'>('home');
  const [navTab, setNavTab] = useState<'home' | 'search' | 'settings' | 'user'>('home');
  const [iconQuery, setIconQuery] = useState('');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-50 overflow-y-auto"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 360, damping: 34 }}
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div
            style={{
              paddingTop: insets.top + 8,
              paddingBottom: insets.bottom + 24,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <HStack justify="between" align="center" className="mb-S">
              <Typography type="headline" size="M">
                Design System
              </Typography>
              <HStack gap="XXS">
                <IconButton
                  icon={theme === 'light' ? 'moon' : 'sun'}
                  size="M"
                  variant="secondary"
                  onPress={toggleTheme}
                  label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                />
                <IconButton icon="cross" size="M" variant="secondary" onPress={onClose} label="Close gallery" />
              </HStack>
            </HStack>

            <div style={{ marginBottom: 24, marginLeft: -16, marginRight: -16 }}>
              <SegmentedControl
                items={CATEGORIES}
                selectedValue={category}
                onValueChange={setCategory}
                className="px-S"
              />
            </div>

            <VStack gap="L" align="stretch">
              {category === 'type' && (
                <VStack gap="L" align="stretch">
                  {TYPE_ORDER.map((type) => {
                    const sizes = SIZE_ORDER.filter((size) => typographySizeMap[size][type] != null);
                    if (sizes.length === 0) return null;
                    return (
                      <Section key={type} title={type}>
                        <VStack gap="XS" align="start">
                          {sizes.map((size) => (
                            <HStack key={size} gap="S" align="baseline" className="w-full">
                              <div style={{ width: 28, flexShrink: 0 }}>
                                <Typography type="label" size="S" color="var(--content-tertiary)">
                                  {size}
                                </Typography>
                              </div>
                              <Typography type={type} size={size}>
                                {SAMPLE_TEXT[type]}
                              </Typography>
                            </HStack>
                          ))}
                        </VStack>
                      </Section>
                    );
                  })}
                </VStack>
              )}

              {category === 'icons' && (() => {
                const normalised = iconQuery.trim().toLowerCase();
                const filtered = normalised
                  ? ICON_NAMES.filter((n) => n.includes(normalised))
                  : ICON_NAMES;
                return (
                  <Section title={`Icons (${filtered.length})`}>
                    <VStack gap="S" align="stretch">
                      <InputField
                        value={iconQuery}
                        onChangeText={setIconQuery}
                        placeholder="Search icons…"
                        clearable
                      />
                      {filtered.length === 0 ? (
                        <Typography type="body" size="M" align="center" color="var(--content-tertiary)">
                          No icons match “{iconQuery}”.
                        </Typography>
                      ) : (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                            gap: 8,
                          }}
                        >
                          {filtered.map((name) => (
                            <VStack
                              key={name}
                              gap="XXXS"
                              align="center"
                              className="p-XS rounded-CARD"
                              style={{ backgroundColor: 'var(--bg-secondary)', minWidth: 0 }}
                            >
                              <LineIcon name={name} size="M" />
                              <Typography
                                type="label"
                                size="S"
                                align="center"
                                color="var(--content-tertiary)"
                                style={{ overflowWrap: 'break-word', wordBreak: 'break-all', width: '100%' }}
                              >
                                {name}
                              </Typography>
                            </VStack>
                          ))}
                        </div>
                      )}
                    </VStack>
                  </Section>
                );
              })()}

              {category === 'actions' && (
                <>
                  <Section title="Button sizes">
                    <VStack gap="XS" align="stretch">
                      <HStack gap="XS" wrap>
                        <Button label="Small" size="S" onPress={() => {}} />
                        <Button label="Medium" size="M" onPress={() => {}} />
                        <Button label="Large" size="L" onPress={() => {}} />
                      </HStack>
                    </VStack>
                  </Section>

                  <Section title="Button variants">
                    <VStack gap="XS" align="stretch">
                      <Button label="Primary" onPress={() => {}} fullWidth />
                      <Button label="Secondary" variant="secondary" onPress={() => {}} fullWidth />
                      <Button label="Tertiary" variant="tertiary" onPress={() => {}} fullWidth />
                      <HStack gap="XS">
                        <Button label="Text" variant="text" onPress={() => {}} />
                        <Button label="Link" variant="link" onPress={() => {}} />
                      </HStack>
                    </VStack>
                  </Section>

                  <Section title="Button states">
                    <VStack gap="XS" align="stretch">
                      <Button label="Disabled" isDisabled onPress={() => {}} fullWidth />
                      <Button label="Loading" isLoading onPress={() => {}} fullWidth />
                    </VStack>
                  </Section>

                  <Section title="Icon buttons">
                    <HStack gap="XS">
                      <IconButton icon="heart-favourite" variant="primary" />
                      <IconButton icon="settings" variant="secondary" />
                      <IconButton icon="search" variant="tertiary" />
                      <IconButton icon="notification-default" size="L" variant="primary" />
                    </HStack>
                  </Section>

                  <Section title="Chips">
                    <HStack gap="XXS" wrap>
                      {(['apple', 'berry', 'citrus'] as const).map((v) => (
                        <SelectableChip
                          key={v}
                          label={v[0]!.toUpperCase() + v.slice(1)}
                          isSelected={chip === v}
                          onPress={() => setChip(v)}
                        />
                      ))}
                    </HStack>
                  </Section>
                </>
              )}

              {category === 'forms' && (
                <>
                  <Section title="Selection">
                    <VStack gap="XS" align="stretch">
                      <Toggle
                        isSelected={toggleValue}
                        onPress={() => setToggleValue((v) => !v)}
                        label="Enable notifications"
                        caption="Get alerts about your spending."
                        hasOutline
                      />
                      <CheckBox
                        isSelected={checked}
                        onPress={() => setChecked((v) => !v)}
                        label="I agree to the terms"
                        hasOutline
                      />
                      <Radio
                        isSelected={radioValue === 'a'}
                        onPress={() => setRadioValue('a')}
                        label="Option A"
                        hasOutline
                      />
                      <Radio
                        isSelected={radioValue === 'b'}
                        onPress={() => setRadioValue('b')}
                        label="Option B"
                        hasOutline
                      />
                    </VStack>
                  </Section>

                  <Section title="Segmented control">
                    <SegmentedControl
                      items={[
                        { value: 'one', label: 'One' },
                        { value: 'two', label: 'Two' },
                        { value: 'three', label: 'Three' },
                      ]}
                      selectedValue={segment}
                      onValueChange={setSegment}
                      isFullWidth
                    />
                  </Section>

                  <Section title="Inputs">
                    <VStack gap="XS" align="stretch">
                      <InputField
                        label="Your name"
                        value={input}
                        onChangeText={setInput}
                        placeholder="Ada Lovelace"
                        clearable
                      />
                      <InputField
                        label="Password"
                        value="hunter2"
                        secureTextEntry
                        showSecureTextEntryToggle
                        onChangeText={() => {}}
                      />
                      <AmountInput label="Amount" value={amount} onChangeText={setAmount} />
                      <DateField label="Date" value={date} onChange={setDate} />
                      <CreditCardInputField label="Card number" value={card} onChangeText={setCard} />
                      <PhoneNumberInput label="Phone number" value={phone} onChangeText={setPhone} />
                      <SSNInput value={ssn} onChangeText={setSsn} />
                      <NIInput value={ni} onChangeText={setNi} />
                      <AddressField value={address} onChangeText={setAddress} />
                      <PickerSelect
                        label="Favourite fruit"
                        value={picked}
                        onValueChange={setPicked}
                        items={[
                          { value: 'apple', label: 'Apple' },
                          { value: 'banana', label: 'Banana' },
                          { value: 'cherry', label: 'Cherry' },
                        ]}
                      />
                    </VStack>
                  </Section>

                  <Section title="Stepper">
                    <Stepper label="Quantity" value={stepperValue} onChange={setStepperValue} min={0} max={99} />
                  </Section>

                  <Section title="Calendar">
                    <Calendar selectedDate={date} onSelectDate={setDate} />
                  </Section>
                </>
              )}

              {category === 'display' && (
                <>
                  <Section title="Tags">
                    <HStack gap="XXS" wrap>
                      <Tag label="Info" variant="info" startIcon="exclamation-in-circle" />
                      <Tag label="Success" variant="success" startIcon="check-circle" />
                      <Tag label="Warning" variant="warning" startIcon="exclamation-in-triangle" />
                      <Tag label="Error" variant="error" startIcon="exclamation-in-circle" />
                      <Tag label="Neutral" variant="neutral" />
                    </HStack>
                  </Section>

                  <Section title="Tiles">
                    <VStack gap="XS" align="stretch">
                      <Tile
                        title="Savings"
                        description="Set aside money automatically"
                        iconName="heart-favourite"
                        badgeLabel="New"
                        badgeVariant="info"
                        onPress={() => {}}
                      />
                      <Tile title="Plain tile" description="No icon, no badge" onPress={() => {}} />
                    </VStack>
                  </Section>

                  <Section title="Progress & loading">
                    <VStack gap="S" align="stretch">
                      <ProgressBar percentageCompleted={62} />
                      <ProgressIndicator currentStep={2} totalSteps={5} />
                      <Skeleton width="80%" height={20} />
                      <HStack gap="S">
                        <LoadingSpinner size="SMALL" />
                        <LoadingSpinner size="MEDIUM" />
                        <LoadingSpinner size="LARGE" />
                      </HStack>
                    </VStack>
                  </Section>

                  <Section title="List item">
                    <ListGroup title="Recent activity" hasOutline>
                      <ListItem
                        title="Coffee shop"
                        subtitle="Yesterday · Card"
                        icon="card-basic"
                        label="-$4.75"
                        onPress={() => {}}
                      />
                      <ListItem
                        title="Payday"
                        subtitle="Apr 15 · Salary"
                        icon="dollar-sign"
                        iconBgColor="var(--bg-positiveLight)"
                        iconColor="var(--content-positiveMid)"
                        label="+$3,200.00"
                      />
                      <ListItem
                        title="Cleo subscription"
                        subtitle="Monthly · Recurring"
                        number={3}
                        numberBgColor="var(--bg-waitingLight)"
                        numberColor="var(--content-waitingMid)"
                        label="-$5.99"
                        onPress={() => {}}
                      />
                    </ListGroup>
                  </Section>
                </>
              )}

              {category === 'nav' && (
                <>
                  <Section title="Tab bar">
                    <TabBar
                      items={[
                        { value: 'home', label: 'Home' },
                        { value: 'cash', label: 'Cash', badge: 3 },
                        { value: 'insights', label: 'Insights' },
                      ]}
                      selectedValue={tab}
                      onValueChange={setTab}
                    />
                  </Section>

                  <Section title="Tab navigation">
                    <TabNavigation
                      items={[
                        { value: 'home', label: 'Home', icon: 'home' },
                        { value: 'search', label: 'Search', icon: 'search' },
                        { value: 'settings', label: 'Settings', icon: 'settings', badge: '!' },
                        { value: 'user', label: 'Profile', icon: 'profile' },
                      ]}
                      selectedValue={navTab}
                      onValueChange={setNavTab}
                    />
                  </Section>
                </>
              )}

              {category === 'logo' && (
                <Section title="Cleo logo">
                  <CleoLogo width={140} height={70} />
                </Section>
              )}

              {category === 'overlays' && (
                <Section title="Overlays">
                  <VStack gap="XS" align="stretch">
                    <Button
                      label="Open bottom sheet"
                      variant="secondary"
                      onPress={() => setSheetOpen(true)}
                      fullWidth
                    />
                    <Button
                      label="Open alert"
                      variant="secondary"
                      onPress={() => setAlertOpen(true)}
                      fullWidth
                    />
                  </VStack>
                </Section>
              )}
            </VStack>
          </div>

          <BottomSheet
            isOpen={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Example bottom sheet"
            subtitle="Tap the backdrop or drag down to dismiss."
          >
            <Button label="Got it" onPress={() => setSheetOpen(false)} fullWidth />
          </BottomSheet>

          <AlertModal
            isOpen={alertOpen}
            title="Delete this item?"
            message="This action can't be undone."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            destructive
            onConfirm={() => setAlertOpen(false)}
            onCancel={() => setAlertOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
