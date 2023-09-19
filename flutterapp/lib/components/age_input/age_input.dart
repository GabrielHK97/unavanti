import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

class AgeInput extends StatefulWidget {
  AgeInput({super.key, required this.onChange});

  final ageController = TextEditingController();
  final void Function(int) onChange;

  @override
  State<AgeInput> createState() => _AgeInputState();
}

class _AgeInputState extends State<AgeInput> {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
          width: 50,
          child: Text(
            'Idade ',
            style:
                GoogleFonts.roboto(fontSize: 14).copyWith(color: Colors.white),
          ),
        ),
        SizedBox(
          width: 200.0,
          height: 24,
          child: TextFormField(
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            onChanged: (value) {
              widget.onChange(int.tryParse(value)!);
            },
            controller: widget.ageController,
            validator: (value) {
              return (value == null || value.isEmpty)
                  ? "Digite uma idade!"
                  : null;
            },
            style: GoogleFonts.roboto(fontSize: 14).copyWith(color: Colors.black),
            decoration: const InputDecoration(
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(),
                contentPadding:
                    EdgeInsets.only(left: 5, top: 0, bottom: 0, right: 5)),
            cursorHeight: 14,
          ),
        )
      ],
    );
  }
}
