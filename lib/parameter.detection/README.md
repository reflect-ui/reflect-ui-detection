# parameter detection

> detects parameter with givven component set.



supported parameter types and nodes

**shape mixin**
- color : Color
- gradient: Gradient
- elevation (shadow) : ...Shadow[]


**component**
- component (other component as slot value)
    - `slot${slot_name} : Widget`
- removed component : ...boolean (draw / don't draw)
    - `show${element_name} : boolean`
- invisible component : ...boolean (visible / invisible)
    - `hide${element_name} : boolean`


**text**
- text value : string (raw)
    - `${slot_name}Text`


**graphics (image/illust)**
- image value : string (url)
    - `${slot_name}ImageUrl`



**icons**
- icon name (material / refelct)