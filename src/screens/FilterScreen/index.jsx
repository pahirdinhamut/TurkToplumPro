import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Switch } from "react-native";
import React, { useEffect } from "react";
import { height, horizontalScale, verticalScale } from "../../utils/Spacing";
import { ModalView, Button, CheckBoxItem, ChoiceInput, Container, Input, Title, HeaderRightComponent } from "../../components";
import { App, Color, Fonts, Translation } from "../../utils/Strings";
import { width } from "../../utils/Size";
import { useTheme } from "@react-navigation/native";
import Network from "../../utils/Network";
import DatabaseManager from "../../utils/Storage";

let mapCount = 0;

export default function FilterScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [modalParam, setModalParam] = React.useState({ vis: false, title: "", multi: false, filter_name: "" });
  const [modalData, setModalData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [originalFilter, setOriginalFilter] = React.useState([]);

  const getLocalFilters = async () => {
    const filtersToSet = await DatabaseManager.getString(App.filters + route.params.category);
    let localFilters;
    if (filtersToSet) {
      localFilters = JSON.parse(filtersToSet);
      setFilterData(localFilters);
    }
    requestApi(localFilters);
  };

  const requestApi = async (localFilters, localOrders) => {
    let response = await Network("TERTIP_SUZGUCH", "GET", { category: route.params.category });
    if (response.code && response.code == "1") {
      const { filters, ordering } = response.msg;
      setOriginalFilter(filters);

      if (localFilters) {
        console.log("local filter exists");

        const newFilters = filters.filter((item) => !localFilters.some((obj) => obj.filter_name === item.filter_name));
        if (newFilters.length) {
          setFilterData([...localFilters, ...newFilters]);
        }
      } else {
        console.log("local filter not    exists");
        setFilterData(filters);
      }
    }
  };

  const headerRight = () => {
    const isInvalid = modalParam.title === "" && !modalParam.multi && modalParam.filter_name === "";
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            marginRight: 10,
            fontSize: 16
          }}
          // onPress clearn all filters
          onPress={() => {
            setFilterData(originalFilter);
          }}
        >
          <Text style={{ color: colors.text }}>Temizle</Text>
        </TouchableOpacity>
      )
    });
  };

  useEffect(() => {
    headerRight();
  }, [originalFilter]); //,originalOrder

  useEffect(() => {
    if (route.params && route.params.category && route.params.name === undefined) {
      getLocalFilters();
    } else {
      //comes back from MapScreen
      console.log(route.params, "another params");
      setSelectedValues(
        "city",
        { val: route.params.name, lat: route.params.lat, lon: route.params.lon, radius: route.params.radius },
        { val: route.params.name, lat: route.params.lat, lon: route.params.lon, radius: route.params.radius }
      );
    }
  }, [route]);

  // apply button press
  const handleApplyOnPress = async () => {
    const query = {};
    const { category } = route.params;

    let isEmptyFilter = true;

    filterData.forEach((obj) => {
      if (obj.selected_values) {
        isEmptyFilter = false;
        const { filter_name, field_type, choices, selected_values } = obj;

        if (
          field_type === "choicefilter" ||
          field_type === "multiplechoicefilter" ||
          field_type === "modelmultiplechoicefilter"
        ) {
          const selectedIndexes = choices.filter((cobj) => cobj.checked).map((cobj) => cobj.index);

          if (selectedIndexes.length > 0) {
            query[filter_name] = selectedIndexes;
          }
        } else if (field_type === "rangefilter") {
          const [min, max] = selected_values.split("|");
          query[`${filter_name}_min`] = min;
          query[`${filter_name}_max`] = max;
        } else {
          query[filter_name] = selected_values;
        }
      }
    });
    if (isEmptyFilter) {
      //delete from local filter database
      await DatabaseManager.deleteRecord(App.filters + route.params.category);
    } else {
      const filterDataString = JSON.stringify(filterData);

      DatabaseManager.setString(App.filters + category, filterDataString);
    }
    //console.log(query, "filter screen queries", category);
    navigation.navigate("ListPosts", { ...query, category: category });
  };

  const getCheckedValues = (objList) => {
    let strValues = "";
    for (let i = 0; i < objList.length; i++) {
      let obj = objList[i];
      if (obj.checked) {
        strValues += obj.value + ",";
      }
    }
    return strValues.substring(0, strValues.length - 1);
  };

  const getSelectedValues = (filter_name) => {
    const obj = filterData.find((item) => item.filter_name === filter_name);
    return obj ? obj.selected_values : "";
  };

  const getCheckedId = (filter_name) => {
    let id = [];
    for (let i = 0; i < filterData.length; i++) {
      let obj = filterData[i];
      if (obj.filter_name === filter_name) {
        obj.choices.forEach((ch) => {
          if (ch.checked) {
            id.push(ch.index);
          }
        });
      }
    }
    return id;
  };

  const setSelectedValues = (
    filter_name,
    defaultVal,
    values,
    choice_index = undefined,
    multichoice = false,
    range = undefined,
    text = ""
  ) => {
    let newFilterValues;
    if (filter_name === "city") {
      newFilterValues = filterData.map((item) => {
        if (item.filter_name === "city") {
          return { ...item, selected_values: values.val };
        } else if (item.filter_name === "lat") {
          return { ...item, selected_values: values.lat };
        } else if (item.filter_name === "lon") {
          return { ...item, selected_values: values.lon };
        } else if (item.filter_name === "radius") {
          return { ...item, selected_values: values.radius };
        }
        return item;
      });
    } else {
      newFilterValues = filterData.map((item) => {
        if (item.filter_name === filter_name) {
          if (choice_index !== undefined) {
            const newChoices = item.choices.map((choice) => ({
              ...choice,
              checked: choice.index === choice_index ? values : multichoice ? choice.checked : false
            }));
            return { ...item, choices: newChoices, selected_values: getCheckedValues(newChoices) };
          } else if (range !== undefined) {
            const currentVal = item.selected_values;
            let [left, right] = currentVal.includes("|") ? currentVal.split("|") : [currentVal, currentVal];
            if (range === "left") left = text;
            else right = text;
            return { ...item, selected_values: left + "|" + right };
          } else {
            return { ...item, selected_values: item.selected_values === "" ? defaultVal : values };
          }
        }
        return item;
      });
    }
    if (choice_index !== undefined) {
      const matchingFilter = newFilterValues.find((filter) => filter.filter_name === filter_name);
      //console.log(matchingFilter, "macth", filter_name);
      let choosedCat = getCheckedId("mpcat"); // list of checked category ids
      if (matchingFilter.choices[0].cat_id && choosedCat.length) {
        setModalData(matchingFilter.choices.filter((obj) => choosedCat.includes(obj.cat_id)));
      } else {
        setModalData(matchingFilter.choices);
      }
    }
    setFilterData(newFilterValues);
  };

  console.log("map", mapCount);
  return (
    <Container bcColor={colors.background} style={{ marginBottom: verticalScale(7) }}>
      <ScrollView>
        {filterData
          ? filterData.map((filter, index) => {
              //console.log(filter, "filter");
              mapCount++;
              switch (filter.field_type) {
                case "multiplechoicefilter":
                  return (
                    <FilterField
                      key={index}
                      title={filter.label}
                      selectedVal={filter.selected_values}
                      onPress={() => {
                        setModalData(filter.choices);
                        setModalParam({ vis: true, title: filter.label, multi: true, filter_name: filter.filter_name });
                      }}
                    />
                  );
                case "modelmultiplechoicefilter":
                  return (
                    <FilterField
                      key={index}
                      title={filter.label}
                      selectedVal={filter.selected_values}
                      onPress={() => {
                        let choosedCat = getCheckedId("mpcat");
                        console.log(choosedCat, "choosed cats are");
                        if (filter.choices[0].cat_id && choosedCat.length) {
                          setModalData(filter.choices.filter((obj) => choosedCat.includes(obj.cat_id)));
                        } else {
                          setModalData(filter.choices);
                        }

                        setModalParam({ vis: true, title: filter.label, multi: true, filter_name: filter.filter_name });
                      }}
                    />
                  );
                case "choicefilter":
                  return (
                    <FilterField
                      key={index}
                      title={filter.label}
                      selectedVal={filter.selected_values}
                      onPress={() => {
                        setModalData(filter.choices);
                        //console.log(filter);
                        setModalParam({ vis: true, title: filter.label, multi: false, filter_name: filter.filter_name });
                      }}
                    />
                  );
                case "rangefilter":
                  return (
                    <RangeFilter
                      key={index}
                      title={filter.label}
                      selectedVal={filter.selected_values}
                      leftOnChange={(text) => {
                        setSelectedValues(filter.filter_name, text, text, undefined, false, "left", text);
                      }}
                      rightOnChange={(text) => {
                        setSelectedValues(filter.filter_name, text, text, undefined, false, "right", text);
                      }}
                    />
                  );
                case "booleanfilter":
                  return (
                    <BooleanField
                      key={index}
                      title={filter.label}
                      val={filter.selected_values}
                      onChange={() => {
                        setSelectedValues(filter.filter_name, true, !filter.selected_values);
                      }}
                    />
                  );
                case "filtermethod":
                  if (filter.filter_name === "city") {
                    return (
                      <FilterField
                        title={"Konum"}
                        onPress={() =>
                          navigation.navigate("location", {
                            category: route.params.category,
                            name: filter.selected_values,
                            lat: getSelectedValues("lat"),
                            lon: getSelectedValues("lon"),
                            radius: getSelectedValues("radius")
                          })
                        }
                        key={index}
                        selectedVal={filter.selected_values}
                      />
                    );
                  }
              }
            })
          : null}
      </ScrollView>

      <ModalView
        open={modalParam.vis}
        width={width * 0.7}
        // height={height * 0.7}
        // onPress={false} // validation for modal close
        onPress={() => {
          setModalParam({ vis: false, title: "", multi: false, filter_name: "" });
        }}
      >
        {/* modal header Container  */}
        <View style={styles.modalTitleContainer}>
          {/* modal header title  */}
          <Text style={styles.modalTitle}>{modalParam.title}</Text>
        </View>
        {/* Content Check Item max total 10 item  */}
        <ScrollView style={{ marginBottom: 10 }}>
          {modalData.map((item, index) => {
            return (
              <CheckBoxItem
                checkBoxVisible={true}
                title={item.value}
                isCheck={item.checked}
                onPress={() => {
                  console.log(item.checked);
                  setSelectedValues(modalParam.filter_name, true, !item.checked, item.index, modalParam.multi);
                }}
                key={index}
              />
            );
          })}
        </ScrollView>

        {/* Buttom */}
        <View style={styles.modalBottumView}>
          <Button
            title={Translation("Apply")}
            textColor={colors.white}
            onPress={() => {
              setModalParam({ vis: false, title: "", multi: false });
            }}
          />
        </View>
      </ModalView>
      <Button
        title={Translation("Apply")}
        textColor={colors.white}
        onPress={handleApplyOnPress}
        style={{ width: "92%", alignSelf: "center", marginTop: 15 }}
      />
    </Container>
  );
}

const FilterField = ({ title, selectedVal, onPress }) => {
  return (
    <View style={{ flex: 1, flexDirection: "column", marginRight: 10, marginLeft: 10 }}>
      <Title title={title} />
      <ChoiceInput onPress={onPress} value={selectedVal} />
    </View>
  );
};

const CharFilter = ({ title, value, onChange, kbType, lines, lineLen }) => {
  if (value != null) {
    value = String(value);
  }
  return (
    <View style={{ marginHorizontal: horizontalScale(10) }}>
      <Title title={title} />
      <Input
        autoCorrect={false}
        value={value}
        numberOfLines={lines}
        multiline={lines > 1}
        keyboardType={kbType}
        txtAlignVertical={lines > 1 ? "top" : "center"}
        maxLength={lineLen ? lineLen : undefined}
        onChangeText={onChange}
        onSelectionChange={(event) => {
          console.log(event.nativeEvent.selection.start, "slection change charfield");
        }}
      />
    </View>
  );
};

const RangeFilter = ({ title, selectedVal, leftOnChange, rightOnChange }) => {
  let [leftVal, rightVal] = selectedVal.split("|");
  const { colors } = useTheme();
  return (
    <View style={{ margin: 8 }}>
      <Title title={title} />
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Input
          keyboardType="numeric"
          value={leftVal}
          onChangeText={leftOnChange}
          width={"45%"}
          placeholder={Translation("Min")}
        />
        <View
          style={{
            width: 10,
            height: 1,
            backgroundColor: colors.text,
            marginHorizontal: 15
          }}
        />
        <Input
          keyboardType="numeric"
          value={rightVal}
          onChangeText={rightOnChange}
          width={"45%"}
          placeholder={Translation("Max")}
        />
      </View>
    </View>
  );
};

const BooleanField = ({ val, title, onChange }) => {
  //console.log(title, val, "switch boolean");
  return (
    <View style={{ marginHorizontal: horizontalScale(10) }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: verticalScale(10)
        }}
      >
        <Title title={title} />
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={val}
          onChange={onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    height: height * 0.07,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightgrey,
    paddingLeft: 10,
    paddingRight: 10
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Fonts.semibold,
    letterSpacing: 0.5
  },
  // modal headers styles
  modalTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Fonts.regular,
    letterSpacing: 0.5,
    color: Color.grey
  },
  // modal bottum styles

  modalBottumContainer: {
    paddingHorizontal: 10
  }
});
